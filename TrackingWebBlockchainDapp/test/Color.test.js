const { assert } = require('chai')
/*const { Item } = require('react-bootstrap/lib/breadcrumb')*/

const Color = artifacts.require('./Color.sol')

  require('chai')
    .use(require('chai-as-promised'))
    .should()

  contract('Color',(accounts)=>{
    let contract

      before(async()=>{
        contract = await Color.deployed()
      })

    describe('deployment',async()=>{
      it('deploys successfully', async()=> {
        
        const adress = contract.address
        assert.notEqual(adress,0x0)
        assert.notEqual(adress,'')
        assert.notEqual(adress,null)
        assert.notEqual(adress,undefined)
      })

      it('has a name',async()=>{
        const name = await contract.name()
        assert.equal(name,'Color')
      })

      it('has a symbole',async()=>{
        const symbole = await contract.symbol()
        assert.equal(symbole,'COLORS')
      })

    })
    describe('minting', async () => {

      it('creates a new token', async () => {
        const result = await contract.mint('#EC058E')
        const totalSupply = await contract.totalSupply()
        // SUCCESS
        assert.equal(totalSupply, 1)
        const event = result.logs[0].args
        assert.equal(event.tokenId.toNumber(),1,'id is correct')
        assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
        assert.equal(event.to,accounts[0],'to is correct')

        //FAILURE : cannot mint the same color twice
        await contract.mint('#EC058E').should.be.rejected;

      })
    })

    describe('indexing', async()=>{
      it('list colors',async()=>{
        // Mint 3 tokens
        await contract.mint('#EF072E')
        await contract.mint('#FFFFFF')
        await contract.mint('#000000')
        const totalSupply = await contract.totalSupply()

        let color
        let result = []

        for ( var i=1; i <= totalSupply;i++){
          color = await contract.colors(i-1)
          result.push(color)
        }

        let expected = ['#EC058E','#EF072E','#FFFFFF','#000000']
        assert.equal(result.join(','),expected.join(','))
      })
    })


  })
