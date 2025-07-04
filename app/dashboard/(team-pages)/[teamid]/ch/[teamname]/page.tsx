"use client"
import { useParams } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import { Send } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { db, } from '@/utils/firebase'
import { addDoc,deleteDoc, collection, DocumentData, getDocs,QueryDocumentSnapshot, doc } from 'firebase/firestore'
import { messageSchema } from '@/Schema/messageSchema'
import { useUser } from '@clerk/nextjs'
import LoadingComponent from '@/components/LoadingComponent'
import Curved from '@/public/curved.png'
import Image from 'next/image'

type fetchdatatype = {
  id:string;
  teamid:string;
  message:string;
  senderid:string;
  sendername:string;
  timestamp: {
    nanoseconds : 789000000,
    seconds : 1751604174
  }
}

// this page is for sending or receiving message from of a team.
export default function Page() {
  const { teamid,teamname } = useParams()
  const [msg,setmsg] = useState('')
  // const [fetchdata,setFetchData] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [fetchdata,setFetchData] = useState<fetchdatatype[]>([])
  const [msgadded,setmsgAdded] = useState(false)
  const [deleteMsg,setdeleteMsg]=useState(false)
  const [btnload,setbtnloading] = useState(false)
  const { user } = useUser()

  useEffect(() => {

    async function getmessage() {
      const querySnapshot = await getDocs(collection(db, `${process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ID}`));

      if(!querySnapshot){
        throw new Error('Can not fetch the message ')
      }
 
      
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        // teamid : doc.get('teamid'),
        ...doc.data()
      } as fetchdatatype));

      setFetchData(docs)
    }

    getmessage()
  },[msgadded,deleteMsg])

  async function addmessage(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    try {
      setbtnloading(true)
      setmsgAdded(prev=>!prev)

      const docRef = await addDoc(collection(db, `${process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ID}`), {
        teamid: teamid,
        message: msg,
        senderid:user?.id,
        sendername: user?.firstName,
        timestamp: new Date()
      });

      if(!docRef){
        throw new Error('Issue occured while adding document')
      }

      toast.success('Document added')
      setmsg('')

    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setbtnloading(false)
    }
  }

  async function deleteMessage(msgId:string){
    try {

      setdeleteMsg(prev => !prev)

      if(!msgId){
        throw new Error('Msg Id invalid.')
      }
  
      await deleteDoc(doc(db,`${process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ID}`,msgId))

      toast.success('msg deleted')
  
    } catch (error) {
      console.error(`Issue Occured deleting the docs: ${error}`)
    }
  }

  return (
    <div className='px-6'>
      <section className='border-b py-2'>
        <p className='text-center font-opensans py-1'>
          <span className='text-xl'>Welcome, </span>
          <span className='text-sm opacity-80'>{teamname ? teamname : 'team x'}</span>
        </p>
        <div className='text-center text-xs border-b opacity-70'>
          <p>Choose wisely, build freely .</p>
        </div>
      </section> 
 
      <section className='flex flex-col pb-4'>
        <div className='flex flex-col-reverse gap-4 overflow-y-auto scrollbar-hide min-h-[calc(96vh-12rem)] h-auto max-h-[calc(96vh-12rem)]'>
          {
            Array.isArray(fetchdata) && fetchdata.length > 0 ? 
            <>
              {
                fetchdata.map((data:fetchdatatype,idx:number) => (
                  <div 
                    className={`flex gap-2 bg-white max-w-[80%] rounded-md 
                      ${data.senderid == user?.id ? 'self-end' : 'self-start'}
                     `}
                    key={idx} 
                  >
                    <p className='bg-purple-500 rounded w-[2px]'></p>
                    <div className='px-2 py-2'>
                      <div className='opacity-40 text-[10px] flex gap-2 '>
                        <p>{data?.sendername}</p>
                        <p>{`${data?.timestamp?.seconds} seconds`}</p>
                      </div>
                      <div className='flex flex-row gap-4 items-center justify-between'>
                        <p className='text-[12px] w-52'>{data?.message}</p>
                        {
                          data.senderid == user?.id && (
                            <div className='bg-purple-200 hover:bg-purple-400 p-1 rounded-sm cursor-pointer ' onClick={async() => await deleteMessage(data.id)}>
                              <Image src={Curved} alt='deleteMsg' className='size-3' />
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </>
            :
            (
              <LoadingComponent label='No messages...' />
            )
          }
        </div>
        
        <div>
          <form onSubmit={addmessage} className='flex flex-col items-center pt-6 gap-2'>
            <p className='text-sm '>Enter your message here ...</p>
            <div className='flex items-center justify-center gap-2'>
              <input type='text' value={msg} onChange={(e) => setmsg(e.target.value)} className='border rounded w-96 text-sm focus:outline-none p-1'/>
              <button type='submit'>
                {btnload ? <Loader2 className='size-4 animate-spin' /> : <Send className='size-5' />}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  ) 
}


// async function handleAddmsg(event:React.FormEvent<HTMLFormElement>){
//     event.preventDefault();

//     try {
//       setbtnloading(true)

//       const res = await fetch(`/api/chathandler/${teamid}`,{
//         method:'POST',
//         headers : {
//           'Content-Type' : 'application/json'
//         },
//         body : JSON.stringify({ message : msg })
//       })

//       if(!res.ok){
//         const errtext = await res.text()
//         console.log(errtext)
//         toast.error(errtext)
//         return;
//       }

//       const data = await res.json()
//       console.log(data?.message)

//       setmsgAdded((prev) => !prev)
//       toast.success(data?.message)
//       setmsg('')
      
//     } catch (error) {
//       console.log(`Issue occured while Adding: ${error}`)
//     } finally {
//       setbtnloading(false)
//     }
//   }