import error from '../../Assets/images/error.svg'
export default function NotFound() {
    return <>
        <div className="text-center mt-5">
            <img src={error} className='w-50' alt="404" />
        </div>
    </>
}

