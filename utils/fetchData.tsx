export async function FetchData(url:string){
    try {
        const res = await fetch(url)

        if(!res.ok){
            throw new Error(`Invalid Response status: ${res.status}`)
        }

        const data = await res.json()

        return { data:data,error:null }

    } catch (error:any) {
        console.error(`Error Fetching data: ${error}`)
        return { data:null,error:error }
    }
}