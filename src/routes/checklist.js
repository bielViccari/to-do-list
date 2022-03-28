const express = require('express')
const checklist = require('../models/checklist')


const router = express.Router()

const Checklist = require('../models/checklist')

//rota GET da cheklist
router.get('/', async (req, res) => {
    try {
        //utiliza o find para encontrar as informações no mongo
        let checklists = await Checklist.find({})
       
        res.status(200).render('checklists/index', { checklists: checklists})
    
    } catch (error) {
        
        res.status(200).render('pages/error', {error: 'Erro ao exibir as listas'})
        
    }
})

//rota POST da checklist
router.post('/', async (req, res) => {
    let { name } = req.body
    try {
        let checklist = await Checklist.create({ name })
        res.status(200).json(checklist)
    }catch(error) {
        res.status(422).json(error)
    }
})

router.get('/:id', async (req, res) => {
   try {
       let checklist = await Checklist.findById(req.params.id)
       res.status(200).render('checklists/show', { checklist: checklist})
   } catch (error) {
       res.status(200).render('pages/error', {error: 'Erro ao exibir as listas de tarefa'})
   }
})

//rota PUT (atualização) da cecklist
router.put('/:id', async (req, res) => {
   try {
       let { name } = req.body
       
       let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true})
       res.status(200).json(checklist)
   } catch (error) {
       
    res.status(422).json(error)
   
}
})

//rota DELETE da checklist
router.delete('/:id', async (req, res) => {
   //tenta deletar usando função asincrona, ou seja ele espera remover do Checklist pelo id passado
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})
module.exports = router