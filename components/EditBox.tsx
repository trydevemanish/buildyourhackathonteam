"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit3 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import toast from "react-hot-toast"

type propsProperties = {
  nameOfProp : string;
}

export function DialogDemoInput({props} : {props : propsProperties}) {
  const [email,setEmail] = useState('')
  const [github,setGithub] = useState('')
  const [linkedin,setLinkedin] = useState('')

  async function handleEmailUpdate(){
    // console.log('Email:', email)
    try {

      toast.loading('updating email.')

      const res =  await fetch('/api/updateEmail',{
        method: 'PUT',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ email : email })
      })
      
      if(!res.ok){
        toast.error(await res.text())
        console.log(await res.text())
        return ;
      }

      const data = await res.json()

      toast.success(data?.message)

    } catch (error) {
      console.log(`Issue Ocuured while updating email : ${error}.`)
      toast.error('Issue Ocuured while updating email.')
    }
  }

  async function handleGithubUpdate() {
    // console.log('Github: ',github)
    try {

      toast.loading('updating github.')

      const res =  await fetch('/api/updateGithub',{
        method: 'PUT',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ github : github })
      })
      
      if(!res.ok){
        console.log(await res.text())
        toast.error(await res.text())
        return ;
      }

      const data = await res.json()

      toast.success(data?.message)

    } catch (error) {
      console.log(`Issue Ocuured while updating github. ${error}`)
      toast.error('Issue Ocuured while updating github')
    }
  }

  async function handleLinkedinUpdate() {
    // console.log("Linkedin: ",linkedin)
    try {

      toast.loading('updating Linkedin.')

      const res =  await fetch('/api/updateLinkedin',{
        method: 'PUT',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ linkedin : linkedin })
      })
      
      if(!res.ok){
        console.log(await res.text())
        toast.error(await res.text())
        return ;
      }

      const data = await res.json()

      toast.success(data?.message)

    } catch (error) {
      console.log(`Issue Ocuured while updating linkedin. :${error}`)
      toast.error('Issue Ocuured while updating linkedin')
    }
  }

  async function handleInputFunction() {
    if(props.nameOfProp === 'Email'){
      handleEmailUpdate()
    } else if (props.nameOfProp === 'Github'){
      handleGithubUpdate()
    } else {
      handleLinkedinUpdate()
    }
  }

  return (
    <div className="cursor-pointer">
    <Dialog>
      <DialogTrigger asChild>
        <Edit3 className="size-[10px]"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>
            {`Make changes to your ${props.nameOfProp} here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
            <Label htmlFor={`${props.nameOfProp}`}>
              {props.nameOfProp}
            </Label>
            <Input
              id={`${props.nameOfProp}`}
              className="col-span-3"
              value={
                props.nameOfProp === 'Email' ? email : 
                props.nameOfProp === 'Github' ? github :
                linkedin
              }
              // props.nameOfProp === 'Email' ? setEmail(e.target.value) :
              // props.nameOfProp === 'Github' ? setGithub(e.target.value) :
              // setLinkedin(e.target.value)
              onChange={(e) => {
                switch (props.nameOfProp){
                  case "Email" : 
                    setEmail(e.target.value)
                    break;  
                  case "Github" : 
                    setGithub(e.target.value)
                  default : 
                    setLinkedin(e.target.value)
                }
              }}
            />
        </div>
        <DialogFooter>
          <button type="submit" className="bg-black text-white px-6 py-2 text-xs rounded" onClick={handleInputFunction}>Save changes</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}


export function DialogDemoTextArea({props} : {props : propsProperties}) {

  const [description, setDescription] = useState('')

  async function handledescriptionChanges(){
    // console.log(description)

    try {

      toast.loading('updating description.')

      const res =  await fetch('/api/updatedesc',{
        method: 'PUT',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ description : description })
      })
      
      if(!res.ok){
        console.log(await res.text())
        toast.error(await res.text())
        return ;
      }

      const data = await res.json()

      toast.success(data?.message)

    } catch (error) {
      console.log(`Issue Ocuured while updating description. :${error}`)
      toast.error('Issue Ocuured while updating description')
    }

  }

  return (
    <div className="cursor-pointer">
    <Dialog>
      <DialogTrigger asChild>
        <Edit3 className="size-[10px]"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>
            {`Make changes to your ${props.nameOfProp} here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
            <Label htmlFor={`${props.nameOfProp}`}>
              {props.nameOfProp}
            </Label>
            <Textarea
              id={`${props.nameOfProp}`}
              className="col-span-3"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
        </div>
        <DialogFooter>
          <button type="submit" className="bg-black text-white px-6 py-2 text-xs rounded" onClick={handledescriptionChanges} >Save changes</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export function DialogDemoSelect({props} : {props : propsProperties}) {

  async function updateRole(role:'Helper' | 'ML_eng' | 'Frontend_dev' | 'Backend_dev' | 'Design') {
    try {

      toast.loading('updating role.')

      const res =  await fetch('/api/changeUserRole',{
        method: 'PUT',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ role : role })
      })
      
      if(!res.ok){
        console.log(await res.text())
        toast.error(await res.text())
        return ;
      }

      const data = await res.json()

      toast.success(data?.message)

    } catch (error) {
      console.log(`Issue Ocuured while updating Role. :${error}`)
      toast.error('Issue Ocuured while updating Role')
    }
  }


  return (
    <div className="cursor-pointer">
    <Dialog>
      <DialogTrigger asChild>
        <Edit3 className="size-[10px]"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>
            {`Make changes to your ${props.nameOfProp} here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
            <Label htmlFor={`${props.nameOfProp}`}>
              {props.nameOfProp} 
            </Label>
            {/* <Textarea
              id={`${props.nameOfProp}`}
              className="col-span-3"
            /> */}
            <Select onValueChange={updateRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="Helper">Helper</SelectItem>
                  <SelectItem value="ML_eng">ML_eng</SelectItem>
                  <SelectItem value="Frontend_dev">Frontend_dev</SelectItem>
                  <SelectItem value="Backend_dev">Backend_dev</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
        <DialogFooter>
          <button type="submit" className="bg-black text-white px-6 py-2 text-xs rounded" >Save changes</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}
