import { onGetAffiliateInfo } from '@/app/actions/groups'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const GroupCreatePage =  async({
    searchParams,
} :{
    searchParams: {[affilate: string]: string}
}) => {
    const { userId } = await auth()

    const affiliate = await onGetAffiliateInfo(searchParams.affilate)

    if(!userId) { redirect('/sign-in') }
    return (
        <>
        <div className="px-7 flex flex-col">
            <h5 className="font-bold text-base text-themeTextWhite">
                Payment Method
            </h5>
            <p className="text-themeTextGray leading-tight">
                Free for 14 days, then $99/month. Cancel anytime. All features. Unlimited everything. No hidden fees.
            </p>
            {affiliate.status === 200 && (
                <div className="w-full mt-5 flex justify-center items-center gap-x-2 italic text-themeTextGray text-sm">
                    You were referred by
                    <Avatar>
                        <AvatarImage src={affiliate.user?.Group?.user.image as string} alt="User" />
                        <AvatarFallback />
                    </Avatar>
                    {affiliate.user?.Group?.user.firstname} {" "}
                    {affiliate.user?.Group?.user.lastname}
                </div>
            )}
        </div>
        <CreateGroup  
            userId={userId}
            affiliate={affiliate.status === 200 ? true : false}
            stripeId={affiliate.user?.Group?.user.stripeId || ""}

        />
        </>
    )
}

export default GroupCreatePage
