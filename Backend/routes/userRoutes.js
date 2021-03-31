const {Router}=require('express');
const userController=require('../controllers/userController')
const router=Router();
const requireAuth=require('../requireAuth')

router.get('/dropdownvalue',userController.get_dropdown)
router.post('/signup', userController.signup_post)
router.post('/login', userController.login_post)
router.get('/user-details/:id', userController.user_item)
router.patch('/user-details/:id', userController.userupdate_item)
router.get('/:email',userController.admin_check);
router.get('/',requireAuth,userController.get_all_details);
router.delete('/all-details/:id',userController.delete_item);
router.patch('/all-details-/:id',userController.update_item);
router.get('/filter/:category',userController.filter_data);
router.patch('/active/:id/',userController.active);
router.patch('/deactive/:id/', userController.deactive);

module.exports=router;
