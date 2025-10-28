import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockKeyhole } from "lucide-react"

const SecurityTab = () => {
  return (
    <>
      <div className="mb-6">
        <h4 className="text-sub-heading flex gap-2 text-[#333333] mb-2"><LockKeyhole /> Change Password</h4>
        <p className="text-mu ted-foreground text-body-1">Update you password to keep your account secure</p>
      </div>

      <form action="" className="flex flex-col gap-4 my-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 md:gap-4">
          <fieldset>
            <Label htmlFor="current" className="text-[20px] text-gray-700 mb-1">Current Password</Label>
            <Input id="current" />
          </fieldset>

          <fieldset>
            <Label htmlFor="new" className="text-[20px] text-gray-700 mb-1">New Password</Label>
            <Input id="new" />
          </fieldset>

          <fieldset>
            <Label htmlFor="confirm" className="text-[20px] text-gray-700 mb-1">Confirm New Password</Label>
            <Input id="confirm" />
          </fieldset>
        </div>
      </form>
    </>
  )
}

export default SecurityTab