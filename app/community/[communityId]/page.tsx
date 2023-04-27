interface IParams {
 communityId?: string;
}


const Community = async ({ params }: { params: IParams }) => {
 return (
  <div> My Community </div>
 );
}

export default Community;