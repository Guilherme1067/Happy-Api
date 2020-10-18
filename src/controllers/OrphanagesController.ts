import { getRepository } from 'typeorm';
import {Request, Response} from 'express';
import Orphanage from '../models/Orphanages'
import OrphanageView from '../views/orphanages_view';

export default {
    async index(request: Request, response: Response){
       
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        
        return response.json(OrphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response){
        
        const {id} = request.params;
        
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.findOneOrFail(id);
        
        return response.json(OrphanageView.render(orphanages))
    },

    async create(request: Request , response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            } = request.body
       
            const orphanagesRepository = getRepository(Orphanage);

            const requestImages = request.files as Express.Multer.File[];
            const images = requestImages.map(( image => {
                return { path: image.filename}
            }))

            const orphanage = orphanagesRepository.create({
               name,
               latitude,
               longitude,
               about,
               instructions,
               opening_hours,
               open_on_weekends,
               images
            })
           
            await orphanagesRepository.save(orphanage);
            
            return response.status(201).json(orphanage)
    }
}