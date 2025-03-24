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
        <div className="flex justify-end text-center">
        <p className="text-lg font-semibold text-gray-800">
        If you want any specific mentor's courses that are not present here
        <a 
          href="/specific-course" 
          className="ml-3 inline-block text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg shadow-lg transition"
        >
          Click here
        </a>
      </p>

      </div>
        <div className="text-3xl font-semibold  md:text-4xl">Mentors</div>
        <MentorsCard mentors={mentors} categoryId={categoryId} />
      </div>
    </div>
  );
}

export default CategoryMentors;
