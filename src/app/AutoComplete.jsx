import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import './AutoComplete.css'

export const AutoComplete = ({ onPlaceSelect }) => {
    return <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_KEY}>
        <GeoapifyGeocoderAutocomplete placeholder="Enter location here"
            lang={"en"}
            limit={5}
            placeSelect={onPlaceSelect}
            skipSelectionOnArrowKey={true}
            type='locality'
        />
    </GeoapifyContext>
};
