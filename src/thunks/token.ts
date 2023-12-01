import {AppThunk} from '~/src/store/store'
import getTokens from '~/src/lib/zilstream/getTokens'
import {slice} from '~/src/slices/token'

const initial = (): AppThunk => async (dispatch): Promise<void> => {
  const tokens = await getTokens()
  console.log('token initial process', tokens.length)
  dispatch(slice.actions.initial(tokens))
}

const thunks = {
  initial,
}

export default thunks
