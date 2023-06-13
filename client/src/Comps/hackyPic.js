import pic from '../Assets/pic-place.png'
import walk from '../Assets/walk.webp'
import paint from '../Assets/paint.webp'
import mc from '../Assets/mc.webp'
import groceries from '../Assets/grocery.webp' 

  //hacky switch statement for imgs not in db
export default function hackyPic(title) {
  switch(title) {
    case 'Walk the dog':
      return walk;
    case 'Paint a wall':
      return paint;
    case 'MC a Party!!':
      return mc;
    case 'Grocery Shopping':
      return groceries;
    default:
      return pic;
  }
};