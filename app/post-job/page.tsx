import { PostJobForm } from '@/components/organisms/PostJobForm'
import { getAllJobFormOptions } from '../actions/offer/getFormData'

const ProfilePage = async () => {
  const options = await getAllJobFormOptions()
  return (
    <div className="flex justify-center my-10 lg:my-20 px-5">
      <PostJobForm selectOptions={options} />
    </div>
  )
}

export default ProfilePage
