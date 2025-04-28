import { Button } from "../ui/button";

export default function CerticateCard() {
    return (
        <div className='bg-[#FFFDFA] shadow rounded-lg p-4 mb-4 text-center border border-primary-theme py-10'>
            <div className='w-[300px] h-[200px] mx-auto mb-4 bg-white border rounded-lg flex flex-col gap-4 p-5'>
                <div className='h-4 w-full bg-gray-200' />
                <div className='h-4 w-full bg-gray-200' />

                <div className="flex gap-5 items-center mt-5">
                    <div className='flex-1 flex flex-col gap-4'>
                        <div className='h-2.5 w-full bg-gray-200' />
                        <div className='h-2.5 w-full bg-gray-200' />
                    </div>
                    <div className='text-center'>
                        <img src="/images/logos/logo.png" alt="OwenaHub" width={40} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-10">
                <h1 className='font-bold text-xl md:text-3xl'>Your certificate is close</h1>
                <p className='text-xs md:text-sm mb-3 font-medium text-muted-foreground'>
                    You are doing great! Keep learning to unlock your certificate!
                </p>
                <Button variant="default" className="bg-[#315E8B] w-max mx-auto px-6 py-6" disabled>
                    Claim certificate
                </Button>
            </div>
        </div>
    )
}
