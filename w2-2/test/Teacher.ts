import { ethers } from "hardhat";
import { expect } from "chai";
import { Teacher } from "../typechain-types/Teacher";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Teacher", () => {
  let teacher: Teacher;
  let student: SignerWithAddress;

  before(async () => {
    const Teacher = await ethers.getContractFactory("Teacher");
    teacher = await Teacher.deploy();
    await teacher.deployed();
    console.log(
      "Teacher deploy successfully. The address is:",
      teacher.address
    );
    const accountes = await ethers.getSigners();
    student = accountes[1];
  });

  it("Teacher can modify score", async () => {
    await teacher.modify(student.address, 50);
    expect(await teacher.getScore(student.address)).to.be.equal(50);
  });

  it("Score must less that 100", async () => {
    await expect(teacher.modify(student.address, 200)).to.be.revertedWith(
      "score must be less than 100"
    );
  });

  it("Non-teacher can not modify score", async () => {
    const Score = await ethers.getContractFactory("Score");
    const score = Score.attach(await teacher.scoreAddress());
    await expect(
      score.modify(student.address, 10)
    ).to.be.revertedWithCustomError(Score, "notTeacher");
  });
});
