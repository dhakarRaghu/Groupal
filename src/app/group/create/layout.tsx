import BackdropGradient from '@/components/global/backdrop-gradient'
import GradientText from '@/components/gradient-text'
import { GROUPLE_CONSTANTS } from '@/constants'
import React, { FC } from 'react'

type Props = {
  children: React.ReactNode
}

const CreateGroupLayout = ({ children }: Props) => {
  return (
    <div className="container mx-auto h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT COLUMN */}
      <div className="flex flex-col justify-center items-start p-8 space-y-4">
        <BackdropGradient className="w-32 h-12 mb-4 opacity-80">
          <h5 className="text-2xl font-bold text-themeTextWhite">
            Groupal.
          </h5>
        </BackdropGradient>

        <GradientText element="H2" className="text-4xl font-semibold">
          Create Your Group
        </GradientText>

        <p className="text-themeTextGray">
          Free for 14 days, then $99/month. Cancel anytime. All features. Unlimited everything. No hidden fees.
        </p>

        <div className="flex flex-col gap-3 mt-8 pl-1">
          {GROUPLE_CONSTANTS.createGroupPlaceholder.map(placeholder => (
            <div className="flex gap-3" key={placeholder.id}>
              {placeholder.icon}
              <p className="text-themeTextGray">{placeholder.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN (children) */}
      <div className="flex justify-center items-center bg-white p-8">
        {children}
      </div>
    </div>
  )
}

export default CreateGroupLayout
