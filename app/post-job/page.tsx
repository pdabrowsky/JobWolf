import { PostJobForm } from '@/components/organisms/PostJobForm'
import { getAllJobFormOptions } from '../actions/JobPost/getFormData'

const ProfilePage = async () => {
  const options = await getAllJobFormOptions()
  return (
    <div className="flex justify-center mt-10 lg:mt-20 px-5">
      <PostJobForm selectOptions={options} />
    </div>
  )
}

export default ProfilePage
