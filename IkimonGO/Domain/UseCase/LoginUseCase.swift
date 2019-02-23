//
//  LoginUseCase.swift
//  IkimonGO
//
//  Created by Takahito Mita on 2019/02/22.
//  Copyright © 2019 Takahito Mita. All rights reserved.
//

import RxSwift

protocol LoginUseCaseProtocol {
    func login(email: String, password: String) -> Observable<LoginStatus?>
}

final class LoginUsecase: LoginUseCaseProtocol {
    private let repository: LoginRepositoryProtocol
    
    init(repository: LoginRepositoryProtocol) {
        self.repository = repository
    }
    
    func login(email: String, password: String) -> Observable<LoginStatus?> {
        return repository.getLoginStatus(email: email, password: password)
    }
}
