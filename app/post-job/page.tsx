import { PostJobForm } from '@/components/organisms/PostJobForm'
import { getFilltersOptions } from '../actions/offer/getFilterOptions'

const ProfilePage = async () => {
  const options = await getFilltersOptions()
  return (
    <div className="flex justify-center my-10 lg:my-20 px-5">
      <PostJobForm selectOptions={options} />
    </div>
  )
}

export default ProfilePage
