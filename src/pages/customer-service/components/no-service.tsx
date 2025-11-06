import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, Undo2 } from 'lucide-react'


const NotFoundService = ({ onReset }: { onReset: () => void }) => {
    return (
        <Card className="w-full  border border-gray-300 rounded-sm  text-center py-8 flex justify-center items-center">
            <CardContent className="flex flex-col items-center justify-center gap-3">
                <AlertCircle className="w-10 h-10 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-muted-foreground">
                    No Service History Found
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                    There are no service requests or matching your filters
                </p>
                <Button
                    onClick={onReset}
                    variant="outline"
                    className="flex items-center gap-2 "
                >
                    <Undo2 className="w-4 h-4" />
                    Reset Filters
                </Button>
            </CardContent>
        </Card>
    )
}

export default NotFoundService