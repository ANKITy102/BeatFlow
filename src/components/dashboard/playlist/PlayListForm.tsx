"use client"
import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'

interface PlayListFormProps {
  showModal: boolean,
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>,
}
interface formdata {
    name:string
}

const PlayListForm: FC<PlayListFormProps> = ({showModal, setShowModal}) => {
    const [formData, setFormData] = useState<formdata>({
        name:"",
    })
    const addPlayList =async () =>{
        console.log(formData)
        if(!formData || formData.name==""){
            return toast.error("Please enter all field.")
        }
        try {
            const playListAdded = await fetch("/api/song/addplaylist", {
                method:"POST",
                body: JSON.stringify(formData)
            })
            const result = await playListAdded.json();
            console.log(playListAdded)
            if(result.status=="fail"){
                return toast.error("Something went wrong.")
            }
            
        } catch (error) {
            toast.error("Something went wrong")
        }
        finally{
            setShowModal(false)
        }

    }

    return (
        showModal ? (
            <div className="fixed inset-0 z-30 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full bg-black opacity-60" onClick={() => setShowModal(false)}></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h4 className="text-lg font-medium text-gray-800">
                                Add Playlist
                            </h4>
                            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                                onClick={() => setShowModal(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-1 space-y-5"
                    >
                    <div>
                        <label className="font-medium">
                            Playlist Name
                        </label>
                        <input
                            type="text"
                            required
                            name="name"
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={formData.name}
                            onChange={(e)=>{
                                setFormData({...formData, [e.target.name]: e.target.value })
                            }}
                        />
                    </div>
                   
                </form>   
                        </div>
                        <div className="flex items-center gap-3 p-4 mt-5 border-t">
                            <button className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() =>addPlayList() }
                            >
                                Accept
                            </button>
                            <button className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : ''
    )
}

export default PlayListForm