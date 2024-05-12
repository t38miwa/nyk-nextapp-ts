"use client"
import { useState, useEffect } from "react" 
import useAuth from "../../../utils/useAuth"

const UpdateItem = (context) => {
    const [image, setImage] = useState("")
    const [favorteam, setFavorTeam] = useState("")
    const [favorplayer, setFavorPlayer] = useState("")
    const [prefecture, setPrefecture] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const [loading, setLoading] = useState(false) 

    const loginUserEmail = useAuth() 

    //const [title, setTitle] = useState("")
    //const [price, setPrice] = useState("")

    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"}) 
            const jsonData = await response.json() 
            const singleItem = jsonData.singleItem
            setFavorTeam(singleItem.FavorTeam)
            setFavorPlayer(singleItem.FavorPlayer)
            setPrefecture(singleItem.prefecture)
            //setTitle(singleItem.title)
            //setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
            setLoading(true)  
        }
        getSingleItem(context.params.id) 
    }, [context])  

    const handleSubmit = async(e) => {
        e.preventDefault()  
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, { 
                method: "PUT",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({

                    //title: title,
                    //price: price,
                    FavorTeam: favorteam,
                    FavorPlayer: favorplayer,
                    prefecture: prefecture,
                    Image: image,
                    description: description,
                    email: loginUserEmail 
                })
            })
            const jsonData = await response.json()  
            alert(jsonData.message)           
        }catch(err){
            alert("アイテム編集失敗")  
        }
    } 

    if(loading){ 
        if(loginUserEmail === email){
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={favorteam} onChange={(e) => setFavorTeam(e.target.value)} type="text" name="favorteam" placeholder="好きなチーム名" required/>
                    <input value={favorplayer} onChange={(e) => setFavorPlayer(e.target.value)} type="text" name="favorplayer" placeholder="好きな選手名" required/>
                    <input value={prefecture} onChange={(e) => setPrefecture(e.target.value)} type="text" name="prefecture" placeholder="都道府県" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>編集</button>
                </form>
            </div>
        )
        }else{                               
            return <h1>権限がありません</h1>    
        }   
    }else{                                  
        return <h1>Loading...</h1>          
    }     
}

export default UpdateItem