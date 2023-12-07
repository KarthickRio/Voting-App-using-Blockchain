 const web3 = new Web3(window.ethereum)
 var account;
const CONTRACT_ADDR = "0x999d15a7cE9Bf0323d6147Bc393CeAD84BDaC77a"
const CONTRACT_ABI = [
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "_canditatename",
                    "type": "string[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_canditateid",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "canditatecount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "canditates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "votecount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_canditateid",
                    "type": "uint256"
                }
            ],
            "name": "getvotecount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "hasvoted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
const contract = new web3.eth.Contract(CONTRACT_ABI , CONTRACT_ADDR)
 document.addEventListener("DOMContentLoaded", function(){
    if(window.ethereum)
    {
        ethereum.request({method:"eth_requestAccounts"}).then((accounts)=>{
         account = accounts[0];
         console.log(account)
    }) 
    }
    else{
        console.log(" Please install metamask ")
    }

    contract.methods.canditatecount().call().then((e)=>{
        for(var i = 1;i<=e ;i++)
        {
            contract.methods.canditates(i).call().then((f) =>{
                console.log(f)
            document.getElementById(f.id).innerHTML = f.name;
            document.getElementById("candidate"+f.id).innerHTML = f.votecount;

        })
    }
})
   
 })

 function vote() {
    var candidateId = document.getElementById("Canditate").value;

    const transaction  =
    {
         from :account,
         to:CONTRACT_ADDR,
         data:contract.methods.vote(candidateId).encodeABI(),
         gas:3200000


    }
    web3.eth.sendTransaction(transaction).on("transactionHash" ,function(hash){
          console.log("Transaction Hash ", hash)
             
    })
    .on("error", function(error) {
           console.log(error)
    
   })
}