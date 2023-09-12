export class ValidationInput {
    static validarLetra(tecla: string): boolean {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(tecla);
    }
}
