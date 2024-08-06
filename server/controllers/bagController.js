const Bag = require('../models/Bag')
const BaseController = require('./baseController')

class BagController extends BaseController {
          constructor() {
                    super(Bag)
          };
       
          async fetchUserBag(req, res) {
                    try {
                              const { userId } = req.params
                              const bag = await this.model.find({ userId }).populate('productId')
                              return res.json(bag)
                    } catch (error) {
                              return res.status(500).json({ message: "Server Error", error: error.message })
                    }
          }
          async addToUserBag(req, res) {
                    try {
                              const { productId, userId } = req.body;
                              const hasDuplicate = await this.hasDuplicate({ productId, userId });
                              if (hasDuplicate) {
                                        return res.status(400).json({ message: 'Product already in the bag' });
                              }

                              const addedToBag = await Bag.create({ productId, userId });

                              if (addedToBag) {
                                        const bag = await this.model.findById(addedToBag._id).populate('productId');
                                        return res.json({ data: bag, message: 'Successfully added to your bag' });
                              } else {
                                        return res.status(500).json({ message: "Failed to add product to the bag" });
                              }
                    } catch (error) {
                              return res.status(500).json({ message: "Server Error", error: error.message });
                    }
          }

}

const controller = new BagController()

module.exports = {
          addToBag: controller.addToUserBag.bind(controller),
          fetchUserBag: controller.fetchUserBag.bind(controller),
          deleteFromBag: controller.delete.bind(controller)
}
