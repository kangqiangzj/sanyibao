var m1 = angular.module("sanyibao",["ionic"]);
	//初始化配置路由
	m1.config(["$stateProvider",function($stateProvider){
		$stateProvider.state("shouye",{
			url:"/shouye",
			templateUrl:"html/shouye.html"			
		}).state("xiangmu",{
			url:"/xiangmu",
			templateUrl:"html/xiangmu.html",
			controller:"xiangmu"
		}).state("detail1",{
			url:"/detail1/:id",
			templateUrl:"html/detail1.html",
			controller:"detail1"
		}).state("login",{
			url:"/login",
			templateUrl:"html/login.html",
			controller:"login"
		})
	}])
			//初始化控制器
	m1.controller("main",["$scope","$rootScope","$state","$http",function($scope,$rootScope,$state,$http){
		$state.go("shouye");
		$http({
			method:"get",
			url:"mock/detail.json",
		}).success(function(data){
			console.log(data.datas);
			$scope.datas = data.datas
		});
		$scope.doRefresh = function(){
			$http({
			method:"get",
			url:"mock/detail.json",
		}).success(function(data){
			console.log(data.datas);
			$scope.datas = data.datas
		});
			$scope.$broadcast('scroll.refreshComplete');
		};
			
	}])
	m1.controller("xiangmu",["$scope","$stateParams","$http",function($scope,$stateParams,$http){
//		$scope.loadMore = function(){
			$http({
				method:"get",
				url:"mock/detail.json",
			}).success(function(data){
				console.log(data.datas);
				$scope.datas = data.datas
//				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
			
//		}
	}])
	
	m1.controller("detail1",["$scope","$stateParams","$http",function($scope,$stateParams,$http){
		console.log($stateParams.id)
		$http({
			method:"get",
			url:"mock/detail.json",
		}).success(function(data){
			var datas = data.datas
			for(var i = 0;i < datas.length;i++){
				if(datas[i].id == $stateParams.id){
					$scope.data = datas[i] 					
				}	
			}
			console.log($scope.data)
		});
		
	}])
	m1.controller("login",["$scope","$stateParams","$http",function($scope,$stateParams,$http){
		
		
	}])