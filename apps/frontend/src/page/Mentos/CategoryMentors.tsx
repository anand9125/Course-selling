import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorsCard from "../../componets/MentorsCard";
import { useMentorStore } from "../../store/useMentorStore";
import SideSearchbar from "../../componets/SideSearchbar";

function CategoryMentors() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { mentors, fetchMentors } = useMentorStore();

  useEffect(() => {
    fetchMentors(categoryId!);
  }, [categoryId]);

 

  return (
    <div className="flex">
     
      <div className="hidden pr-12 pt-4 lg:block w-1/4 ">
        <SideSearchbar />
      </div>
      <div className="w-full lg:w-3/4">
        <div className="text-3xl font-semibold pt-3 md:text-4xl">Mentors</div>
        <MentorsCard mentors={mentors} categoryId={categoryId} />
      </div>
    </div>
  );
}

export default CategoryMentors;
