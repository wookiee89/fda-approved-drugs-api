const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()

var approvalDate = [];
var activeIngredients = [];
var status = [];
const obj = []

app.get('/', (req,res) => {
    res.json('Welcome!')
})

app.get('/newdrugs', (req, res) => {
    axios.get('https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=reportsSearch.process&rptName=1&reportSelectMonth=01&reportSelectYear=2023&nav#navigation')
        .then((response) => {
            const html = response.data
            //console.log(html)
            const $ = cheerio.load(html)

            $('.ts .odd .sorting_1').each(function() {
                approvalDate = $(this).text().trim()
                
                obj.push({
                    approvalDate,
                })
            })
            console.log(approvalDate)
            res.json(obj)
        })
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

#example_1 > tbody > tr:nth-child(2) > td.sorting_1
#example_1 > tbody > tr:nth-child(3) > td.sorting_1