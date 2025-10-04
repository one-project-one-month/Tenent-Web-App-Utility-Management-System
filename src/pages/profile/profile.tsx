import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LogOut, MoveLeft } from "lucide-react"
import type { FormEvent } from "react"
import { Link } from "react-router"

const profile = () => {
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className="min-h-[85vh] my-10">
      <Link to="/my-billing" className="flex items-center gap-2 hover:font-medium transition-all group">
        <MoveLeft size={18} strokeWidth={1.3} className="group-hover:[stroke-width:2]" />
        Back
      </Link>
      <div>
        <h1 className="text-h1 my-10 text-center">Profile</h1>
        <Card className="mt-30 inline-block min-w-[300px] sm:w-[55vw] md:w-[60vw] lg:w-1/2 ml-[50%] translate-x-[-50%] bg-white">

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 whitespace-nowrap">
            <div>
              <img src="profile.png" alt="Profile Image" className="-translate-y-2/3 w-32 sm:w-40 md:w-50" />
              <div className="-translate-y-1/3">
                <div className="mb-6">
                  <p className="text-h6 text-secondary-foreground">Name:</p>
                  <p className="text-muted-foreground">John Doe</p>
                </div>
                <div className="mb-6">
                  <p className="text-h6">Email: </p>
                  <p className="text-muted-foreground">john@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="-translate-y-1/3 sm:translate-y-0">
              <div className="mb-6">
                <p className="text-h6">Room Number: </p>
                <p className="text-muted-foreground">005</p>
              </div>
              <div className="mb-6">
                <p className="text-h6">Phone Number: </p>
                <p className="text-muted-foreground">1234567890</p>
              </div>
              <Dialog>
                <form onSubmit={handleFormSubmit}>
                  <DialogTrigger asChild>
                    <Button variant={"destructive"} className="text-gray-100 cursor-pointer hover:bg-chart-1 transition-all active:scale-95">
                      Logout <LogOut strokeWidth={3} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] py-8">
                    <DialogHeader>
                      <DialogTitle className="text-center">Are you sure you want to log out?</DialogTitle>
                      <DialogDescription className="text-center my-3">
                        We’ll keep your data safe. You can log back in anytime.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-2 justify-center sm:justify-center">
                      <DialogClose asChild>
                        <Button variant="secondary" className="cursor-pointer">Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive" type="submit" className="cursor-pointer">Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default profile
