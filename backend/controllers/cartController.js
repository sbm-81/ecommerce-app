import userModel from "../models/userModel.js"

//add products to user cart
export const addToCart=async(req,res)=>{
    try{
        const {userId,itemId,size}=req.body
        

        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]++;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,msg:"Product added to cart"})

    }catch(error){
        console.error(error)
        res.json({success:false,msg:error.message})

    }
    
}
// update user cart
export const updateCart=async(req,res)=>{
    try{
        const {userId,itemId,size,quantity}=req.body
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;
        cartData[itemId][size]=quantity


        
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,msg:"Cart updated"})

    }catch(error){
        console.error(error)
        res.json({success:false,msg:error.message})

    }

}


//get user cart data
export const getUserCart=async(req,res)=>{
    try{
        const {userId}=req.body
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData
        res.json({success:true,cartData})

    }catch(error){
        console.error(error)
        res.json({success:false,msg:error.message})

    }

}