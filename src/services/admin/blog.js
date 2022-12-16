import { serviceMaker, methods } from '../index'

export const ADMIN_BLOG_FETCH_ALL = () => serviceMaker('/blogs', methods.GET)
export const ADMIN_BLOG_FETCH_BY_ID = id => serviceMaker(`/blog?content_type=${id}`, methods.GET)
export const ADMIN_BLOG_CREARTE = payload => serviceMaker('blog/save', methods.POST, payload)
export const ADMIN_BLOG_UPDATE = payload => serviceMaker(`/blog/update?content_type=${payload.content_type}`, methods.PUT, payload)
export const ADMIN_BLOG_DELTE = payload => serviceMaker(`/blog/delete?content_type=${payload.content_type}`, methods.DELETE)

export const ADMIN_FETCH_ALL_CONTENT = () => serviceMaker('/contactUs', methods.GET)
export const ADMIN_FETCH_CONTACT_PAGINATION = (p) => serviceMaker(`/contactUs?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}`, methods.GET)
export const ADMIN_FETCH_BLOG_PAGINATION = (p) => serviceMaker(`/blogs?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}&isPublished=${p.isPublished}`, methods.GET)
