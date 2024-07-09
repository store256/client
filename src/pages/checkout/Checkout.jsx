import { Button } from "@mui/material"
import TextField from "@mui/material/TextField"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Checkout = () => {

    const [formFields, setformFields] =useState({
        name: '',
        pincode: '',
        address:'',
        phoneNumber:'',
        email:'',
        city:'',
        state:'',
        country:''
    })
  return (
    <section className='cartSection mb-5 checkoutPage'>
    <div className='container-fluid'>
        <form>
            <div className='row '>
                <div className='col-md-8 checkAddress'>
                    <div className='form w-75 mt-4 shadow'>
                        <h3>Shopping Address</h3>
                        <div className='form-group mb-3 mt-4'>
                            <TextField id="outlined-basic" label="Enter Full Name" variant="outlined" className='w-100'  name="name" />
                        </div>
                        <div className='form-group mb-3'>
                            <TextField id="outlined-basic" label="Enter Pincode" variant="outlined" className='w-100'  name="pincode" />
                        </div>
                        <div className='form-group mb-3'>
                            <TextField id="outlined-basic" label="Enter Phone Number." variant="outlined" className='w-100'  name="phoneNumber" />
                        </div>
                        <div className='form-group'>
                            <TextField id="outlined-basic" label="Enter Full Address" variant="outlined" className='w-100' multiline
                                rows={4} name="address" />
                        </div>

                    </div>

                </div>




                <div className="col-md-4">
            <div className="card p-4 cartRightBox">
                <div className="d-flex align-items-center mb-4">
                    <h4 className="mb-0 Subtotal">Subtotal</h4>
                    <h5 className="subtotal-ml-auto mb-0"><span className="text-g">GHS200</span></h5>
                </div>
                <div className="d-flex align-items-center mb-4">
                    <h4 className="mb-0 Subtotal">Delivery</h4>
                    <h5 className="subtotal-ml-auto mb-0"><span className="text-g">Free</span></h5>
                </div>
                <div className="d-flex align-items-center mb-4">
                    <h4 className="mb-0 Subtotal">Total</h4>
                    <h5 className="subtotal-ml-auto mb-0"><span className="text-g">GHS200</span></h5>
                </div>
                <Button className="btn-g text-capitalize"> Proceed Payment</Button>
                
            </div>
        </div>



            </div>
        </form>
    </div>
</section>
  )
}

export default Checkout