// image of the account user

// Icon imports
import SolidPortrait from "#/components/Icons/SolidPortrait"
import Button from "#/components/ui/Button"

const Picture = () => (
  <div className="flex flex-col align-middle">
    <div className="flex min-w-45.75 justify-center">
      <div className="rounded-full overflow-hidden h-45.75">
        <SolidPortrait size={183} />
      </div>
    </div>
    <div className="flex justify-center w-full pt-6 pb-6">
      <Button
        onClick={() => console.log('onClick Functionality to be added')}
        text="Upload new Picture"
        colour="white"
      />
    </div>
    <div className="flex justify-center w-full pt-6 pb-6">
      <p className="text-sm">Remove Picture</p>
    </div>
  </div>
)

export default Picture