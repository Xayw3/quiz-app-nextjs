import { Schema, models, model, Model } from "mongoose"

export type CategoryProps = {
  _id: string;
  title: string;
  image: string
}

const CategorySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide category name']
  }
})

const Category:Model<CategoryProps> = models.Category || model('Category', CategorySchema)

export default Category