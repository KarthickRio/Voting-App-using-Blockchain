/ SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;
contract Voting {
          struct canditate {
            uint id;
            string name;
            uint votecount;
          }

          mapping(uint => canditate) public canditates;

          mapping(address => bool) public hasvoted;

          uint public canditatecount;

          constructor(string[] memory _canditatename)
          {
             canditatecount = 0;
             for(uint i = 0; i<_canditatename.length;i++)
             {
                addcanditate(_canditatename[i]);
             }
          }

          function addcanditate(string memory name) private 
          {
                        canditatecount++;
                        canditates[canditatecount] = canditate(canditatecount,name,0);
          }
          function vote(uint _canditateid) public {
                require(_canditateid > 0 && _canditateid <=canditatecount ,"INVALID CANDITATE ID");
                require(!hasvoted[msg.sender], "Already Voted");
                canditates[_canditateid].votecount++;
                hasvoted[msg.sender] = true;
          }
          function getvotecount(uint _canditateid) public view returns(uint)
          {
                  require(_canditateid > 0 && _canditateid <=canditatecount ,"INVALID CANDITATE ID");
                  return canditates[_canditateid].votecount;
          }
}