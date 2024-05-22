import { apiSlice } from "../../store/api/apiSlice"

const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            signIn: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/sign-in',
                    method: 'POST',
                    body: { ...credentials },
                    provideTags: ['user']
                })
            }),

            signUp: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/sign-up',
                    method: 'POST',
                    body: { ...credentials },
                    provideTags: ['user']
                })
            }),

            refreshToken: builder.mutation({
                query: () => ({
                    url: '/auth/refresh',
                    method: 'POST',
                    body: {},
                    providesTags: ['user']
                })
            }),

            users: builder.query({
                query: ()=> '/leads/'
            })
        }
    }
})

export const {useSignInMutation, useRefreshTokenMutation, useSignUpMutation, useUsersQuery} = authSlice