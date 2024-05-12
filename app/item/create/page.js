"use client"
import { useState } from "react" 
import useAuth from "../../utils/useAuth"
import ImgInput from "../../components/imgInput" 

const CreateItem = () => {
    const [image, setImage] = useState("")
    const [favorteam, setFavorTeam] = useState("")
    const [favorplayer, setFavorPlayer] = useState("")
    const [prefecture, setPrefecture] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const loginUserEmail = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()  
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
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
            alert("アイテム作成失敗")  
        }
    } 

    if(loginUserEmail){ 
        return (
            <div>
                <h1 className="page-title">アイテム作成</h1>
                <ImgInput setImage={setImage}/>
                <form onSubmit={handleSubmit}>
                <input value={favorteam} onChange={(e) => setFavorTeam(e.target.value)} type="text" name="favorteam" placeholder="好きなチーム名" required/>
                    <input value={favorplayer} onChange={(e) => setFavorPlayer(e.target.value)} type="text" name="favorplayer" placeholder="好きな選手名" required/>
                    <input value={prefecture} onChange={(e) => setPrefecture(e.target.value)} type="text" name="prefecture" placeholder="都道府県" required/>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem