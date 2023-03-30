// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "hardhat/console.sol";

contract ToumaToken is IERC20, IERC20Metadata {
    string private _name;
    string private _symbol;
    string private _decimals;
    uint private _totalSupply;

    mapping(address => uint) _balances;
    mapping(address => mapping(address => uint)) _allowance;

    constructor(string memory name_, string memory symbol_, uint totalSupply_) {
        _name = name_;
        _symbol = symbol_;
        _mint(totalSupply_);
    }

    function _mint(uint amount) internal {
        _totalSupply = amount;
        _balances[msg.sender] += amount;
        console.log("_mint account:", msg.sender);
    }

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function decimals() external pure override returns (uint8) {
        return 18;
    }

    function totalSupply() external view override returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint) {
        return _balances[account];
    }

    function allowance(
        address owner,
        address spender
    ) external view override returns (uint) {
        return _allowance[owner][spender];
    }

    function transfer(
        address to,
        uint amount
    ) external override returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(
        address spender,
        uint amount
    ) external override returns (bool) {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint amount
    ) external override returns (bool) {
        require(_allowance[from][msg.sender] >= amount, "Insufficient balance");
        require(_balances[from] >= amount, "Insufficient balance");
        _allowance[from][msg.sender] -= amount;
        _balances[from] -= amount;
        _balances[to] += amount;
        return true;
    }
}
