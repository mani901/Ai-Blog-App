import { tr } from 'motion/react-client';
import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlog, index }) => {
    const { axios } = useAppContext();
    const { title, createdAt } = blog;
    const blogDate = new Date(createdAt);

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/blog/${blog._id}`);
            if (data.success) {
                toast.success(data.message);
                fetchBlog();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handlePublish = async () => {
        try {
            const { data } = await axios.put(`/api/blog/${blog._id}/toggle-publish`);
            if (data.success) {
                toast.success(data.message);
                fetchBlog();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <tr className='border-y border-gray-300'>
            <th className='px-2 py-4 xl:px-6'>{index}</th>
            <td className='px-2 py-4'>{title}</td>
            <td className='px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${blog.isPublished ? 'text-green-600' : 'text-orange-700'}`}>{blog.isPublished ? 'Published' : 'UnPublished'}</p>
            </td>
            <td className='px-2 py-4 flex text-xs gap-3'>
                <button className='border px-2 py-0.5 mt-1 rounded cursor-pointer' onClick={handlePublish}>
                    {blog.isPublished ? 'UnPublished' : 'Published'}</button>
                <img src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all duration-300 cursor-pointer' onClick={handleDelete} />
            </td>

        </tr>
    )
}

export default BlogTableItem