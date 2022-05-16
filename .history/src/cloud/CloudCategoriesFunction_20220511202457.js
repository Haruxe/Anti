// Cloud code to watch categories event
let options = {
    chainId: "0x13881",
    address: "0xFdBDf33036aA7b0DaDFBD30DDb1356468d7740a8",
    topic: "ContentAdded(bytes32, string)",
    abi: {
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "contentId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "contentUri",
				"type": "string"
			}
		],
		"name": "ContentAdded",
		"type": "event"
	},
    limit: 500000,
    tableName: "ContentAdded",
    sync_historical: false,
  };
  
Moralis.Cloud.run("watchContractEvent", options, { useMasterKey: true });