A= [[1.7] , [1/7,1]]
import numpy as np
lamb, v = np.linalg.eig(A)
lambda_max = max(abs(lamb))
loc = np.where(lamb==lambda_max)
weight = abs(v[0:len(A),loc[0][0]])
weight = weight/sum(weight)
print(weight)
