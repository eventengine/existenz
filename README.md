# existenz


## Node.js Equity Crowdfunding platform on the blockchain

### Description:
### Dependencies:
* Node.js
* Express 4
* jade template engine
* Colu Api 
* Bootstrap 3

### Todos for MVP 1.0.0 :
* Make the base structure of app

##### Front-end:
* Make the basic ui deisgn
* get all bootraps class and icons 
* Make the code for :
* link, video, text, embeded content in the Project page
* Add views :
* Create a new project
* Project page
* Search projects
* Donate to project
* My Wallet
*

##### Backend:
* Make the basic express structure
* Make a coluapi script to interface with colu : (create asset, manage asset, delete asset, asser transfer)
* Make a basic dev platform (in the front-end) to:
* test the pipeline on colu api side ( from create asset to manage to transfer and/or delete) using the front end basic forms to create a project and retreive all data for front ( total asset , sold asset and remaining asset value ect)
* make MVP routing structure :
* create/edit projet profile
* contribute to project ( with falses tests transactions ) 
* search througth projects
* My wallet ( data abuout possesed assets and related financial infos)
* Then :
* integrate colu api between( create project and project profile) with necesseray forms in testnet
* Test full transaction (with false data )
* Design the re-distribution method ( n% of total amount distributed to n% privekey )
* design a cash-in method that transfer n% amount to cash 
* Integrate credit card payment processors ( for contribution and distribution)

###### Colu start:
* export COLU_SDK_RPC_SERVER_HTTP_PORT=8091
* export COLU_SDK_NETWORK='testnet'
* export COLU_SDK_PRIVATE_SEED=c619c575d28a0ab6777d6f971441b24f9ca202358361529f798b159c66bbcee9
* server hd.wallet = mhKD2JLXCz8UU2MtnNHnwBQJwpNCobHvGf