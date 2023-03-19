// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.16;

import "hardhat/console.sol";

interface ITeacher {
    function modify(address student, uint score) external;
}

interface IScore {
    function modify(address student, uint score) external;

    function scores(address student) external view returns (uint);
}

contract Score {
    address teacher;
    mapping(address => uint) public scores;
    error notTeacher();

    constructor() {
        console.log("score creator is:", msg.sender);
        teacher = msg.sender;
    }

    modifier onlyTeacher() {
        if (msg.sender != teacher) {
            revert notTeacher();
        }
        _;
    }

    modifier scoreLess100(uint score) {
        console.log("score less 100");
        require(score <= 100, "score must be less than 100");
        _;
    }

    function modify(
        address student,
        uint score
    ) public onlyTeacher scoreLess100(score) {
        console.log("modify caller is:", msg.sender);
        scores[student] = score;
    }
}



