import SectionTiltle from '../../../components/SectionTitle/SectionTiltle';
import { useForm } from "react-hook-form"
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiodSecure';
import axios from 'axios';
import Swal from 'sweetalert2';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            console.log('form data', menuItem)
            // 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)

            if(menuRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
        }
        console.log(res.data)
        
    };
    
    // console.log(res.data);

    return (
        <div>
            <SectionTiltle heading='add an item' subHeading='whats new' />
            <div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Recipi name"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full max-w-xs" />
                    </label>

                    <div className='flex gap-6'>

                        {/* category */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Cagetory*</span>
                            </div>
                            <select
                                {...register('category', { required: true })}
                                defaultValue='default'
                                className="select select-bordered w-full">
                                <option disabled value='default'>Select a category</option>
                                <option value='salad'>Salad</option>
                                <option value='pizza'>Pizza</option>
                                <option value='soup'>Pizza</option>
                                <option value='dessert'>Dessert</option>
                                <option value='drink'>Drink</option>
                            </select>
                        </label>

                        {/* price */}

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full max-w-xs" />
                        </label>


                    </div>
                    {/* recipi details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea {...register('recipe')}
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </label>
                    <div>

                        <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs mt-6" />

                    </div>

                    <button className='btn'>Add Item <FaUtensils /></button>
                </form>

            </div>
        </div>
    );
};

export default AddItems;