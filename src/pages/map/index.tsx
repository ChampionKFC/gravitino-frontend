import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'
import { placeholderQuery } from '../tasklist/constants'
import FilterIcon from '@/assets/icons/filter_icon.svg'
import MinimizeIcon from '@/assets/icons/minimize_icon.svg'
import { CustomAlert } from '@/components/custom-alert/custom-alert'
import MapPin from '@/components/map-pin/map-pin'
import RoundedButton from '@/components/rounded-button/rounded-button'
import { LoadingSpinner } from '@/components/spinner/spinner'
import { useGetCheckpointsQuery } from '@/redux/api/checkpoints'
import { CheckpointsPayloadInterface } from '@/types/interface/checkpoint'

const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify')
const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM)
const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
} = reactify.module(ymaps3)

export default function MapPage() {
    const { t } = useTranslation()

    const [checkpointsQuery] =
        useState<CheckpointsPayloadInterface>({
            ...placeholderQuery,
            sorts: { checkpoint_id: 'ASC' },
        })

    const {
        data: checkpoints = { count: 0, data: [] },
        isError,
        isLoading,
    } = useGetCheckpointsQuery(checkpointsQuery)

    return (
        <div className='w-full h-full flex flex-col border-2'>
            <div className='border-b-2 bg-white flex justify-between items-center px-6'>
                <h2 className='text-2xl font-medium py-6'>{t('map.title')}</h2>
                <div className='flex flex-row gap-4'>
                    <RoundedButton icon={<FilterIcon />} onClick={() => { }} />
                    <RoundedButton icon={<MinimizeIcon />} onClick={() => { }} />
                </div>
            </div>
            {isLoading && <LoadingSpinner />}
            {isError && <CustomAlert />}
            <div className='w-full h-full overflow-hidden'>
                <YMap
                    location={{ center: [37.61556, 55.75222], zoom: 4 }}
                    mode="vector"
                >
                    <YMapControls position='right' />

                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />

                    {checkpoints.data.map((checkpoint, index) => (
                        <YMapMarker
                            key={index}
                            coordinates={[checkpoint.lat, checkpoint.lng]}
                        >
                            <MapPin checkpoint={checkpoint} />
                        </YMapMarker>
                    ))}
                </YMap>
            </div>

        </div>
    )
}
