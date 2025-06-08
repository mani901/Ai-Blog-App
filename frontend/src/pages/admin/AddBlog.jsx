import React, { useState, useRef, useEffect } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddBlog = () => {
    const { axios } = useAppContext();
    const [isAdding, setIsAdding] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('All');
    const [description, setDescription] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        try {
            const blog = {
                title,
                subTitle,
                category,
                description: quillRef.current.root.innerHTML,
                isPublished,

            }
            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog));
            formData.append('image', image);

            const { data } = await axios.post('/api/blog/add', formData);
            if (data.success) {
                toast.success(data.message);
                setTitle('');
                setSubTitle('');
                setCategory('Startup');
                quillRef.current.root.innerHTML = '';
                setImage(false);
            } else {
                toast.error(data.message);
            }
            setIsAdding(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsAdding(false);
        }

    }

    const generateContent = async () => {
        if (!title.trim()) {
            toast.error('Please enter a title first');
            return;
        }

        setIsGenerating(true);
        try {
            console.log(title);
            const { data } = await axios.post('/api/blog/generate-content', { prompt: title });
            if (data.success) {
                quillRef.current.root.innerHTML = data.content;
                toast.success('Content generated successfully!');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to generate content');
        } finally {
            setIsGenerating(false);
        }
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
            <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
                <p>Upload Thumbnail</p>
                <label htmlFor="image">
                    <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />

                    <input type="file" onChange={(e) => setImage(e.target.files[0])} id='image' hidden required />
                </label>
                <p className='mt-4'>Blog Title</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Blog Title' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded ' />

                <p className='mt-4'>Blog Subtitle</p>
                <input type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder='Enter Blog Subtitle' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded ' />

                <p className='mt-4'>Blog Description</p>
                <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                    <div ref={editorRef}></div>

                    <button
                        type='button'
                        onClick={generateContent}
                        disabled={isGenerating}
                        className={`absolute bottom-1 right-2 ml-2 text-sx text-white px-4 py-1.5 rounded cursor-pointer ${isGenerating
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-black/70 hover:underline hover:bg-black/80'
                            }`}
                    >
                        {isGenerating ? 'Generating...' : 'Generate With AI'}
                    </button>
                </div>
                <p className='mt-4'>Blog Category</p>
                <select onChange={(e) => setCategory(e.target.value)} name='category' className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>

                    <option value="">Select Category</option>
                    {blogCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <div className='flex gap-2 mt-4'>
                    <p>Publish Now</p>
                    <input type="checkbox" name="isPublished" id="isPublished" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                </div>

                <button type='submit' disabled={isAdding} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>{isAdding ? 'Adding...' : 'Publish Blog'}</button>

            </div>


        </form>
    )
}

export default AddBlog