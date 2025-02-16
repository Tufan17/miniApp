
class BaseService {
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      try {
        const createdItem = await this.model.create(data);
        return createdItem;
      } catch (error) {
        throw new Error(`Could not create item: ${error.message}`);
      }
    }
  
    async findById(id,select,populate) {
      try {
        const item = await this.model.findById(id).select(select).populate(populate);
        return item;
      } catch (error) {
        throw new Error(`Could not find item: ${error.message}`);
      }
    }
  
    async update(id, data) {
      try {
        const updatedItem = await this.model.findByIdAndUpdate(id, data, { new: true });
        if (!updatedItem) {
          throw new Error('Item not found');
        }
        return updatedItem;
      } catch (error) {
        throw new Error(`Could not update item: ${error.message}`);
      }
    }
  
    async deleteAll(filter) {
      try {
        const deletedItem = await this.model.deleteMany(filter);
        return true;
      } catch (error) {
        throw new Error(`Could not delete item: ${error.message}`);
      }
    }

    async deleteOne(filter) {
      try {
        const deletedItem = await this.model.deleteOne(filter);
        return deletedItem;
      } catch (error) {
        throw new Error(`Could not delete item: ${error.message}`);
      }
    }
  
    async deleteById(id) {
      try {
        const deletedItem = await this.model.findByIdAndDelete(id);
        return deletedItem;
      } catch (error) {
        throw new Error(`Could not delete item: ${error.message}`);
      }
    }
  
    async findAll(data,select,populate,sort,introPopulate) {
      try {
        const query = this.model.find(data).select(select).populate(populate).sort(sort).lean();
        if (Array.isArray(populate)) {
          populate.forEach(pop => {
            if (pop.path) {
              query.populate(pop);
            } else {
              query.populate(populate);
            }
          });
        } else if (populate) {
          if(introPopulate){
          query.populate({
            path: populate, 
            populate: {
              path: introPopulate
            }
          })
        }else{
          query.populate(populate);
        }
      }
       
      
    
        const items = await query.exec();
        return items;
      } catch (error) {
        throw new Error(`Could not fetch items: ${error.message}`);
      }
    }

    async findOne(data,select,populate,sort) {
      try {        
        const query = this.model.findOne(data).select(select).populate(populate).sort(sort).lean();
        if (Array.isArray(populate)) {
          populate.forEach(pop => {
            if (pop.path) {
              query.populate(pop);
            } else {
              query.populate(populate);
            }
          });
        } else if (populate) {
          query.populate(populate);
        }
    
        const items = await query.exec();
        return items;
      } catch (error) {
        throw new Error(`Could not fetch items: ${error.message}`);
        
      }
    }

    async aggregate(data) {
      try {
        const item = await this.model.aggregate(data);
        return item;
      } catch (error) {
        throw new Error(`Could not fetch items: ${error.message}`);
      }
    }

    async updateMany(filter, data) {
      try {
        const result = await this.model.updateMany(filter, data);
        return result;
      } catch (error) {
        throw new Error(`Could not update items: ${error.message}`);
      }
    }

    


  
  }

  
  
module.exports = BaseService;