import { type SignedInAuthObject } from '@clerk/nextjs/api'

export const user1: SignedInAuthObject = {
  userId: 'user1',
  sessionId: '',
  session: undefined,
  actor: undefined,
  user: undefined,
  orgId: undefined,
  orgRole: undefined,
  orgSlug: undefined,
  organization: undefined,
  debug: function (): unknown {
    throw new Error('Function not implemented.')
  },
  sessionClaims: {
    __raw: 'mockRawToken',
    iss: 'mockIssuer',
    sub: 'mockSubject',
    sid: 'mockSessionId',
    nbf: 0,
    exp: 0,
    iat: 0,
  },
  getToken: () => Promise.resolve('mockToken'),
}
