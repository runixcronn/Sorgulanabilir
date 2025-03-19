import { useState, useEffect } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  /*

  Ek not:

  Bu hata, sunucuda oluşturulan HTML içeriği ile istemcide React tarafından oluşturulan içeriğin uyuşmadığını gösterir.
  Özellikle, tarih ve saat formatlarının sunucu ve istemci arasında farklılık göstermesi bu hataya neden olabilir.

   */

  const [comments, setComments] = useState(postData.comments);
  const [formData, setFormData] = useState({
    userName: "",
    commentText: "",
    isAnonymous: false,
  });

  const formattedDate = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const [postDataWithFormattedDate, setPostDataWithFormattedDate] = useState({
    ...postData,
    metaData: {
      ...postData.metaData,
      timeOfPost: formattedDate,
    },
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.userName || !formData.commentText) {
      return;
    }

    const newId = `comment-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const newComment = {
      id: newId,
      userName: formData.userName,
      isAnonymous: formData.isAnonymous,
      commentText: formData.commentText,
    };

    setComments((prevComments) => [...prevComments, newComment]);

    setFormData({
      userName: "",
      commentText: "",
      isAnonymous: false,
    });
  }

  return (
    <div className="post-container">
      <PostContent data={{ ...postDataWithFormattedDate, comments }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Kullanıcı adı girin."
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          name="commentText"
          value={formData.commentText}
          onChange={handleChange}
          required
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            name="isAnonymous"
            checked={formData.isAnonymous}
            onChange={handleChange}
          />
          İsimsiz mi göndereyim?
        </label>
        <button>Gönder</button>
      </form>
    </div>
  );
}
