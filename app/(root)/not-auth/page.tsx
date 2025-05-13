import { InfoBlock } from "@/shared/components";

export default function UnauthorizedPage() {
    return (
        <div className='flex flex-col items-center justify-center mt-40'>
            <InfoBlock 
            title="Доступ запрещён!!! Пожалуйста, авторизуйтесь"
            text='Для доступа к странице профиля необходимо пройти авторизацию.'
            imageUrl='/lock.png'
            />
        </div>
    );
}