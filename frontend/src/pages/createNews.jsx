import NewsForm from "../components/newsform";
import { createArticle } from "../util/playerApi";

function CreateNewsPage(){

    async function create(values){
        await createArticle(values);
    }



return(
    <NewsForm initialValues={null} action={create} buttonName="Create"/>
)

}


export default CreateNewsPage;